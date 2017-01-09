defmodule Joggernaut.TestHelpers do
  alias Joggernaut.{Repo, User}

  def insert_user(role) do
    case role do
      "regular" -> insert_regular_user
      "user_manager" -> insert_user_manager
      "admin" -> insert_admin
    end
  end

  defp insert_regular_user() do
    user = %{
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@joggernaut.com",
      password: "john1234",
      role: "regular"
    }

    %User{}
    |> User.changeset_test(user)
    |> Repo.insert!()
  end

  defp insert_user_manager() do
    user = %{
      first_name: "Jill",
      last_name: "Doe",
      email: "jill.doe@joggernaut.com",
      password: "jill1234",
      role: "user_manager"
    }

    %User{}
    |> User.changeset_test(user)
    |> Repo.insert!()
  end

  defp insert_admin() do
    user = %{
      first_name: "Bruce",
      last_name: "Wayne",
      email: "bruce.wayne@joggernaut.com",
      password: "bruce123",
      role: "admin"
    }

    %User{}
    |> User.changeset_test(user)
    |> Repo.insert!()
  end
end
