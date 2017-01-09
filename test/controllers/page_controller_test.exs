defmodule Joggernaut.PageControllerTest do
  use Joggernaut.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, :ok)
  end
end
