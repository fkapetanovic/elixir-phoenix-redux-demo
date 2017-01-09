defmodule Joggernaut.Plug.Authorize do
  alias Joggernaut.SessionController

  def init(opts), do: opts

  def call(conn, _opts) do
    current_user = conn.assigns[:current_user] || Guardian.Plug.current_resource(conn)
    {user_id, _} = Integer.parse(conn.params["user_id"])

    case current_user.id == user_id or current_user.role == "admin" do
      true -> conn
      _ -> SessionController.unauthorized(conn)
    end
  end
end
