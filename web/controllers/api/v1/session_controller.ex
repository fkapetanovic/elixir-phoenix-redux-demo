defmodule Joggernaut.SessionController do
use Joggernaut.Web, :controller

alias Joggernaut.{User, UserView, SessionView, ErrorView}

plug :scrub_params, "session" when action in [:create]

def show(conn, _) do
  user = Guardian.Plug.current_resource(conn)

  conn
  |> render(UserView, "show.json", user: user)
end

def create(conn, %{"session" => session_params}) do
  changeset = User.changeset_session(%User{}, session_params)

  case changeset do
    %Ecto.Changeset{valid?: true} ->
      case Joggernaut.Session.authenticate(session_params) do
        {:ok, user} ->
          {:ok, jwt, _claims} = user |> Guardian.encode_and_sign(:token)

          conn
          |> put_status(:created)
          |> render("show.json", jwt: jwt, user: user)
        :error ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", message: "Invalid email or password.")
      end
    _ ->
      conn
      |> put_status(:unprocessable_entity)
      |> render(ErrorView, "error.json", changeset: changeset)
  end
end

def delete(conn, _) do
  {:ok, claims} = Guardian.Plug.claims(conn)

  conn
  |> Guardian.Plug.current_token
  |> Guardian.revoke!(claims)

  conn
  |> render("delete.json")
end

def unauthenticated(conn, _params) do
  conn
  |> put_status(:forbidden)
  |> render(SessionView, "forbidden.json", error: "Not authenticated")
  |> halt()
end

def unauthorized(conn) do
  conn
  |> put_status(:unauthorized)
  |> render(SessionView, "unauthorized.json", error: "Not authorized")
  |> halt()
end

def not_found(conn) do
  conn
  |> put_status(:not_found)
  |> render(SessionView, "not_found.json", error: "Resource not found")
  |> halt()
end
end
