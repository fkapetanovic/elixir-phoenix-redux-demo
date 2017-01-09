defmodule Joggernaut.RegistrationControllerTest do
  use Joggernaut.ConnCase

  @valid_user %{user: %{
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@joggernaut.com",
      password: "john1234"
    }
  }

  @invalid_user %{user: %{
      first_name: "John",
      last_name: "Doe",
      email: "notavalid@email",
      password: "2short"
    }
  }

  setup _ do
    {:ok, conn: build_conn}
  end

  test "register a valid user", %{conn: conn} do
    conn = post(conn, registration_path(conn, :create, @valid_user))

    assert json_response(conn, :created)["jwt"] != nil
    assert json_response(conn, :created)
  end

  test "register an invalid user", %{conn: conn} do
    conn = post(conn, registration_path(conn, :create, @invalid_user))

    assert json_response(conn, :unprocessable_entity)
  end
end
