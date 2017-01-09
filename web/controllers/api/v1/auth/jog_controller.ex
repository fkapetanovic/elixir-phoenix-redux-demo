defmodule Joggernaut.JogController do
  use Joggernaut.Web, :controller

  alias Joggernaut.{Repo, Jog, User, ErrorView}
  alias Joggernaut.Plug.Authorize

  plug :scrub_params, "jog" when action in [:create, :update]
  plug Authorize

  def index(conn, %{"user_id" => user_id}) do
    jogs = Repo.get!(User, user_id)
    |> assoc(:jogs)
    |> order_by(desc: :jog_date, asc: :id)
    |> Repo.all

    conn
    |> render("index.json", jogs: jogs)
  end

  def create(conn, %{"user_id" => user_id, "jog" => jog_params}) do
    changeset = Repo.get!(User, user_id)
    |> build_assoc(:jogs)
    |> Jog.changeset(jog_params)

    case Repo.insert(changeset) do
      {:ok, jog} ->
        conn
        |> put_status(:created)
        |> render("show.json", jog: jog)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id,"user_id" => user_id, "jog" => jog_params}) do
    changeset = Repo.get!(User, user_id)
    |> assoc(:jogs)
    |> Repo.get!(id)
    |> Jog.changeset(jog_params)

    case Repo.update(changeset) do
      {:ok, jog} ->
        conn
        |> put_status(:ok)
        |> render("show.json", jog: jog)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id, "user_id" => user_id}) do
    jog = Repo.get!(User, user_id)
    |> assoc(:jogs)
    |> Repo.get!(id)

    case Repo.delete jog do
      {:ok, _} ->
        conn
        |> put_status(:ok)
        |> render("show.json", jog: jog)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def search(conn, %{"user_id" => user_id, "start_date" => start_date, "end_date"=> end_date}) do
    changeset = Jog.changeset_filter(%Jog{}, %{start_date: start_date, end_date: end_date})

    case changeset do
      %Ecto.Changeset{valid?: true} ->
        jogs = Repo.get!(User, user_id)
        |> assoc(:jogs)
        |> Jog.build_filter(changeset)
        |> order_by(desc: :jog_date, asc: :id)
        |> Repo.all

        conn
        |> render("index.json", jogs: jogs)
      _ ->
      conn
      |> put_status(:unprocessable_entity)
      |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def report(conn, %{"user_id" => user_id, "start_date" => start_date, "end_date"=> end_date}) do
    changeset = Jog.changeset_filter(%Jog{}, %{start_date: start_date, end_date: end_date})

    case changeset do
      %Ecto.Changeset{valid?: true} ->
        report = Repo.get!(User, user_id)
        |> assoc(:jogs)
        |> Jog.build_filter(changeset)
        |> Repo.all
        |> Jog.build_report

        conn
        |> render("report.json", report: report)
      _ ->
      conn
      |> put_status(:unprocessable_entity)
      |> render(ErrorView, "error.json", changeset: changeset)
    end
  end
end
