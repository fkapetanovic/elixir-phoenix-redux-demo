defmodule Joggernaut.UserTest do
  use Joggernaut.ModelCase

  alias Joggernaut.User

  @valid_attrs %{
    first_name: "some content",
    last_name: "some content",
    email: "valid.email@joggernaut.com",
    password: "12345678"
  }

  @invalid_attrs %{
    first_name: "some content",
    last_name: "some content",
    email: "invalid@email",
    password: "2short"
  }

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes - role supplied" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
