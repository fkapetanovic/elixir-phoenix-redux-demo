defmodule Joggernaut.RegistrationController  do
  use Joggernaut.Web, :controller

  alias Joggernaut.{Repo, User, SessionView, ErrorView}

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset_register(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        {:ok, jwt, _claims} = Guardian.encode_and_sign(user, :token)

        conn
        |> put_status(:created)
        |> render(SessionView, "show.json", jwt: jwt, user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", changeset: changeset)
    end
  end
end
