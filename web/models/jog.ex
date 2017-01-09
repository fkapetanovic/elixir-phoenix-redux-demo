defmodule Joggernaut.Jog do
  use Joggernaut.Web, :model
  alias Joggernaut.Constants

  @derive {Poison.Encoder, only: [:id, :jog_date, :time, :distance]}

  schema "jogs" do
    field :jog_date, Ecto.Date
    field :time, :integer
    field :distance, :integer
    field :start_date, Ecto.Date, virtual: true
    field :end_date, Ecto.Date, virtual: true

    belongs_to :user, Joggernaut.User

    timestamps()
  end

  @required_fields ~w(jog_date time distance)

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, [])
    |> validate_required([:jog_date, :time, :distance])
    |> validate_is_future_date
    |> validate_number(:distance, greater_than: 0, less_than_or_equal_to: Constants.max_distance)
    |> validate_number(:time, greater_than: 0, less_than_or_equal_to: Constants.max_time)
  end

  def changeset_filter(model, params \\ %{}) do
    model
    |> cast(params, [], ~w(start_date end_date))
    |> validate_date_range
  end

  def validate_date_range(changeset) do
    today = Ecto.Date.utc

    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{start_date: start_date, end_date: end_date}} ->
        cond do
          Ecto.Date.compare(start_date, today) == :gt ->
            changeset
            |> add_error(:start_date, "Start date is in the future.")
          Ecto.Date.compare(start_date, end_date) == :gt ->
            changeset
            |> add_error(:start_date, "Start date must be earlier than end date.")
          true ->
            changeset
        end
      %Ecto.Changeset{valid?: true, changes: %{start_date: start_date}} ->
        if Ecto.Date.compare(start_date, today) == :gt do
          changeset
          |> add_error(:start_date, "Start date is in the future.")
        else
          changeset
        end
      _ ->
        changeset
    end
  end

  def build_filter(query, changeset) do
    start_date = changeset.changes[:start_date]
    end_date = changeset.changes[:end_date]

    cond do
      start_date != nil && end_date != nil ->
        from j in query,
          where: j.jog_date >= ^start_date and j.jog_date <= ^end_date
      start_date != nil ->
        from j in query,
          where: j.jog_date >= ^start_date
      end_date != nil ->
        from j in query,
          where: j.jog_date <= ^end_date
      true ->
        query
    end
  end

  def build_report(jogs) do
    jogs
    |> Enum.map(fn(jog) -> %{
        time: jog.time,
        distance: jog.distance,
        week: Calendar.Date.week_number(Ecto.Date.to_erl(jog.jog_date))
      }
    end)
    |> Enum.group_by(fn(jog) -> jog.week end)
    |> Enum.map(fn({k, v}) -> Enum.reduce(v, %{count: 0, time: 0, distance: 0},
        fn(x, acc) -> %{
          count: acc.count + 1,
          time: acc.time + x.time,
          distance: acc.distance + x.distance,
          week: elem(k, 1),
          year: elem(k, 0)
        }
      end)
    end)
    |> Enum.sort(&(&1.week <= &2.week))
  end

  defp validate_is_future_date(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{jog_date: jog_date}} ->
        today = Ecto.Date.utc
        if Ecto.Date.compare(jog_date, today) == :gt do
          changeset
          |> add_error(:jog_date, "Date is in the future.")
        else
          changeset
        end
        _ ->
        changeset
      end
  end
end
