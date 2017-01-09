defmodule Joggernaut.JogControllerTest do
  use Joggernaut.ConnCase
  alias Joggernaut.{Repo, User, Jog}

  @valid_jog_1 %{jog: %{
      jog_date: "2016-10-30",
      time: 3600,
      distance: 5000
    }
  }

  @valid_jog_2 %{jog: %{
      jog_date: "2016-11-30",
      time: 1800,
      distance: 3000
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

  @tag login_as: "regular"
  test "nonexisting jog route", %{user: user} do
    conn =
      build_conn
      |> post("/users/#{user.id}/jogs/nothinghere")

    assert html_response(conn, :not_found)
  end

  test "require user authentication on all jog actions", %{conn: conn} do
    Enum.each([
      get(conn, user_jog_path(conn, :index, 1)),
      post(conn, user_jog_path(conn, :create, 1, %{jog: %{}})),
      put(conn, user_jog_path(conn, :update, 1, 1, %{jog: %{}})),
      delete(conn, user_jog_path(conn, :delete, 1, 1))
    ], fn conn ->
      assert json_response(conn, :forbidden)
    end)
  end

  @tag login_as: "regular"
  test "get all jogs", %{conn: conn, user: user} do
    insert_jog(user.id, @valid_jog_1.jog)
    insert_jog(user.id, @valid_jog_2.jog)

    conn = get(conn, user_jog_path(conn, :index, user.id))
    assert json_response(conn, :ok)

    jogs = json_response(conn, :ok)["jogs"]
    assert Enum.count(jogs) == 2
  end

  @tag login_as: "regular"
  test "search jogs - start date supplied", %{conn: conn, user: user} do
    insert_jog(user.id, @valid_jog_1.jog)
    insert_jog(user.id, @valid_jog_2.jog)

    conn = get(conn, user_jog_path(conn, :search, user.id,
      %{start_date: "2016-11-01", end_date: nil}))

    assert json_response(conn, :ok)

    jogs = json_response(conn, :ok)["jogs"]
    assert Enum.count(jogs) == 1
  end

  @tag login_as: "regular"
  test "search jogs - end date supplied", %{conn: conn, user: user} do
    insert_jog(user.id, @valid_jog_1.jog)
    insert_jog(user.id, @valid_jog_2.jog)

    conn = get(conn, user_jog_path(conn, :search, user.id,
      %{start_date: nil, end_date: "2016-11-02"}))

    assert json_response(conn, :ok)

    jogs = json_response(conn, :ok)["jogs"]
    assert Enum.count(jogs) == 1
  end

  @tag login_as: "regular"
  test "search jogs - date range supplied", %{conn: conn, user: user} do
    insert_jog(user.id, @valid_jog_1.jog)
    insert_jog(user.id, @valid_jog_2.jog)

    conn = get(conn, user_jog_path(conn, :search, user.id,
      %{start_date: "2015-01-01", end_date: "2017-01-01"}))

    assert json_response(conn, :ok)

    jogs = json_response(conn, :ok)["jogs"]
    assert Enum.count(jogs) == 2
  end

  @tag login_as: "regular"
  test "insert a jog", %{conn: conn, user: user} do
    conn = post(conn, user_jog_path(conn, :create, user.id, @valid_jog_1))

    assert json_response(conn, :created)
  end

  @tag login_as: "regular"
  test "update a jog", %{conn: conn, user: user} do
    inserted_jog = insert_jog(user.id, @valid_jog_1.jog)
    updated_jog = put_in(@valid_jog_1.jog.time, 9999)

    conn = put(conn, user_jog_path(conn, :update, user.id, inserted_jog.id, updated_jog))
    response = json_response(conn, :ok)

    assert response["jog"]["time"] == 9999
    assert json_response(conn, :ok)
  end

  @tag login_as: "regular"
  test "delete a jog", %{conn: conn, user: user} do
    inserted_jog = insert_jog(user.id, @valid_jog_1.jog)
    conn = delete(conn, user_jog_path(conn, :delete, user.id, inserted_jog.id))

    assert json_response(conn, :ok)
  end

  @tag login_as: "regular"
  test "get all jogs - invalid date range supplied", %{conn: conn, user: user} do
    insert_jog(user.id, @valid_jog_1.jog)
    insert_jog(user.id, @valid_jog_2.jog)

    conn = post(conn, user_jog_path(conn, :search, user.id,
      %{filter: %{start_date: "2017-01-01", end_date: "2015-01-01"}}))

    assert html_response(conn, :not_found)
  end

  @tag login_as: "admin"
  test "update a jog that doesn't belong to the given user", %{conn: conn, user: user} do
    inserted_user = insert_user("regular")
    inserted_jog = insert_jog(inserted_user.id, @valid_jog_1.jog)

    updated_jog = put_in(@valid_jog_1.jog.time, 9999)

    assert_raise Ecto.NoResultsError, fn ->
      put(conn, user_jog_path(conn, :update, user.id, inserted_jog.id, updated_jog))
    end
  end

  @tag login_as: "admin"
  test "delete a jog that doesn't belong to the given user", %{conn: conn, user: user} do
    inserted_user = insert_user("regular")
    inserted_jog = insert_jog(inserted_user.id, @valid_jog_1.jog)

    assert_raise Ecto.NoResultsError, fn ->
      delete(conn, user_jog_path(conn, :delete, user.id, inserted_jog.id))
    end
  end

  @tag login_as: "regular"
  test "get an report", %{conn: conn, user: user} do
    insert_jog(user.id, @valid_jog_1.jog)
    insert_jog(user.id, @valid_jog_2.jog)

    conn = get(conn, user_jog_path(conn, :report, user.id,
      %{start_date: "2015-01-01", end_date: "2017-01-01"}))

    assert json_response(conn, :ok)
  end

  defp insert_jog(user_id, jog) do
    Repo.get!(User, user_id)
    |> build_assoc(:jogs)
    |> Jog.changeset(jog)
    |> Repo.insert!()
  end
end
