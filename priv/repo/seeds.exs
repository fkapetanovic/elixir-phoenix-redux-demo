# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Joggernaut.Repo.insert!(%Joggernaut.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Joggernaut.{Repo, User, Jog}

regular_user = %{
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@joggernaut.com",
  password: "john1234",
  role: "regular"
}

user_manager = %{
  first_name: "User",
  last_name: "Manager",
  email: "manager@joggernaut.com",
  password: "manager1",
  role: "user_manager"
}

admin = %{
  first_name: "Admin",
  last_name: "Admin",
  email: "admin@joggernaut.com",
  password: "admin123",
  role: "admin"
}

%User{}
|> User.changeset_test(user_manager)
|> Repo.insert!()

%User{}
|> User.changeset_test(admin)
|> Repo.insert!()

inserted_user = %User{}
  |> User.changeset_test(regular_user)
  |> Repo.insert!()

[
  %{
    jog_date: "2016-03-01",
    time: 3600,
    distance: 10000
  },
  %{
    jog_date: "2016-03-02",
    time: 1800,
    distance: 6000
  },
  %{
    jog_date: "2016-05-02",
    time: 3000,
    distance: 14000
  },
  %{
    jog_date: "2016-05-04",
    time: 1000,
    distance: 5000
  }
]
|> Enum.each(fn jog ->
    inserted_user
    |> Ecto.build_assoc(:jogs)
    |> Jog.changeset(jog)
    |> Repo.insert!()
  end)
