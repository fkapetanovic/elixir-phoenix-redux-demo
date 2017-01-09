defmodule Joggernaut.User do
  use Joggernaut.Web, :model

  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email, :role]}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :role, :string
    field :password, :string, virtual: true

    has_many :jogs, Joggernaut.Jog

    timestamps()
  end

  @required_fields ~w(first_name last_name email password)
  @email_regex ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, [])
    |> validate_input
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  def changeset_session(model, params \\ :empty) do
    model
    |> cast(params, ~w(email password), [])
    |> validate_input
  end

  def changeset_register(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, [])
    |> unique_constraint(:email, message: "Email already taken")
    |> validate_input
    |> validate_confirmation(:password, message: "Password does not match")
    |> generate_encrypted_password
    |> put_change(:role, "regular")
  end

  def changeset_update(model, params \\ :empty) do
    model
    |> cast(params, ~w(first_name last_name email), ~w(password))
    |> validate_format(:email, @email_regex)
    |> generate_encrypted_password
    |> unique_constraint(:email, message: "Email already taken")
  end

  def changeset_test(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, ~w(encrypted_password role))
    |> validate_input
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  defp validate_input(changeset) do
    changeset
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    |> validate_length(:password, min: 8)
  end

  defp generate_encrypted_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
