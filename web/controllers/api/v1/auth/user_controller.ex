defmodule Joggernaut.UserController  do
  use Joggernaut.Web, :controller

  alias Joggernaut.{Repo, User, ErrorView}

  plug :scrub_params, "user" when action in [:update, :create]
  plug :authorize_resource, model: User

  def index(conn, _) do
    users = User
    |> order_by(desc: :id)
    |> Repo.all()

    conn |>
    render("index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> render("show.json", user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params, "user" => %{"password" => _}}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset_update(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    case Repo.delete user do
      {:ok, user} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end
end
