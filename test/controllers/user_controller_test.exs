defmodule Joggernaut.UserControllerTest do
  use Joggernaut.ConnCase
  alias Joggernaut.{Repo, User}

  @valid_user %{user: %{
      first_name: "Some",
      last_name: "User",
      email: "some.user@randomail.com",
      password: "someuser"
    }
  }

  @valid_user_update %{user: %{
      first_name: "New",
      last_name: "Name",
      email: "new.mail@randomail.com",
      password: "pass12345"
    }
  }

  @invalid_user %{user: %{
      first_name: "Some",
      last_name: "User",
      email: "notavalid@email",
      password: "2short"
    }
  }

  @valid_admin %{user: %{
      first_name: "Some",
      last_name: "User",
      email: "malicious@ranomail.com",
      password: "12345678",
      role: "admin"
    }
  }

  setup config do
    conn = build_conn
    if role = config[:login_as] do
      user = insert_user(role)
      conn = Guardian.Plug.api_sign_in(conn, user)
      {:ok, conn: conn, user: user}
    else
      {:ok, conn: conn}
    end
  end

  test "nonexisting user route" do
    conn =
      build_conn
      |> post("/users/nothinghere")

    assert html_response(conn, :not_found)
  end

  test "require user authentication on all user actions", %{conn: conn} do
    Enum.each([
      get(conn, user_path(conn, :index)),
      post(conn, user_path(conn, :create, %{user: %{first_name: "john"}})),
      put(conn, user_path(conn, :update, 1, %{user: %{password: "pass1234"}})),
      put(conn, user_path(conn, :update, 1, %{user: %{first_name: "john"}})),
      delete(conn, user_path(conn, :delete, 1))
    ], fn conn ->
      assert json_response(conn, :forbidden)
    end)
  end

  @tag login_as: "regular"
  test "regular user can't change anything", %{conn: conn, user: user} do
    Enum.each([
      get(conn, user_path(conn, :index)),
      post(conn, user_path(conn, :create, %{user: %{first_name: "john"}})),
      put(conn, user_path(conn, :update, user.id, %{user: %{password: "pass1234"}})),
      put(conn, user_path(conn, :update, user.id, %{user: %{first_name: "john"}})),
      delete(conn, user_path(conn, :delete, user.id))
    ], fn conn ->
      assert json_response(conn, :unauthorized)
    end)
  end

  @tag login_as: "admin"
  test "can't change nonexisting user", %{conn: conn, user: user} do
    Enum.each([
      put(conn, user_path(conn, :update, user.id + 1, %{user: %{password: "pass1234"}})),
      put(conn, user_path(conn, :update, user.id + 1, %{user: %{first_name: "john"}})),
      delete(conn, user_path(conn, :delete, user.id + 1))
    ], fn conn ->
      assert json_response(conn, :unauthorized)
    end)
  end

  @tag login_as: "admin"
  test "get users", %{conn: conn} do
    conn = get(conn, user_path(conn, :index))

    assert json_response(conn, :ok)
  end

  @tag login_as: "admin"
  test "insert a user", %{conn: conn} do
    conn = post(conn, user_path(conn, :create, @valid_user))

    assert json_response(conn, :created)
    assert Repo.aggregate(User, :count, :id) == 2
  end

  @tag login_as: "user_manager"
  test "try to insert an admin illegally", %{conn: conn} do
    conn = post(conn, user_path(conn, :create, @valid_admin))

    assert json_response(conn, :created)
    assert Repo.all(from u in User, where: u.role == "admin", select: u) == []
  end

  @tag login_as: "admin"
  test "update a user", %{conn: conn, user: user} do
    conn = put(conn, user_path(conn, :update, user.id, @valid_user_update))

    response = json_response(conn, :ok)

    assert response["user"]["first_name"] == "New"
    assert response["user"]["last_name"] == "Name"
    assert response["user"]["email"] == "new.mail@randomail.com"
    assert json_response(conn, :ok)
  end

  @tag login_as: "admin"
  test "delete a user", %{conn: conn, user: user} do
    conn = delete(conn, user_path(conn, :delete, user.id))

    assert Repo.aggregate(User, :count, :id) == 0
    assert json_response(conn, :ok)
  end

  @tag login_as: "admin"
  test "insert an invalid user", %{conn: conn} do
    conn = post(conn, user_path(conn, :create, @invalid_user))

    assert json_response(conn, :unprocessable_entity)
    assert Repo.aggregate(User, :count, :id) == 1
  end

  @tag login_as: "admin"
  test "insert a duplicate user", %{conn: conn, user: user} do
    duplicate_user = put_in(@valid_user.user.email, user.email)
    conn = post(conn, user_path(conn, :create, duplicate_user))

    assert json_response(conn, :unprocessable_entity)
    assert Repo.aggregate(User, :count, :id) == 1
  end

  @tag login_as: "admin"
  test "update an invalid user", %{conn: conn, user: user} do
    conn = put(conn, user_path(conn, :update, user.id, @invalid_user))

    assert json_response(conn, :unprocessable_entity)
  end
end
