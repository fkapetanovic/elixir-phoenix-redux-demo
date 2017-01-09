defmodule Joggernaut.SessionControllerTest do
  use Joggernaut.ConnCase

  setup _ do
    {:ok, conn: build_conn}
  end

  test "sign in a user", %{conn: conn} do
    insert_user("regular")

    conn = post(conn, session_path(conn, :create,
      %{session: %{email: "john.doe@joggernaut.com", password: "john1234"}}))

    assert json_response(conn, :created)["jwt"] != nil
    assert json_response(conn, :created)
  end

  test "get current user", %{conn: conn} do
    user = insert_user("regular")
    conn = Guardian.Plug.api_sign_in(conn, user)
    conn = get(conn, session_path(conn, :show))

    assert json_response(conn, :ok)
  end

  test "current user is nil when not logged in", %{conn: conn} do
    conn = get(conn, session_path(conn, :show))

    assert json_response(conn, :ok)["user"] == nil
    assert json_response(conn, :ok)
  end

  test "log out", %{conn: conn} do
    user = insert_user("regular")
    conn = Guardian.Plug.api_sign_in(conn, user)

    conn = delete(conn, session_path(conn, :delete))
    assert json_response(conn, :ok)
  end
end
