defmodule Joggernaut.JogTest do
  use Joggernaut.ModelCase

  alias Joggernaut.{Jog, Constants}

  @valid_attrs %{distance: Constants.max_distance, jog_date: %{day: 17, month: 4, year: 2010}, time: Constants.max_time}
  @invalid_attrs_1 %{distance: Constants.max_distance + 1, jog_date: %{day: 17, month: 4, year: 2010}, time: 42}
  @invalid_attrs_2 %{distance: 42, jog_date: %{day: 17, month: 4, year: 2010}, time: Constants.max_time + 1}

  test "changeset with valid attributes" do
    changeset = Jog.changeset(%Jog{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes - max distance exceeded" do
    changeset = Jog.changeset(%Jog{}, @invalid_attrs_1)
    refute changeset.valid?
  end

  test "changeset with invalid attributes - max time exceeded" do
    changeset = Jog.changeset(%Jog{}, @invalid_attrs_2)
    refute changeset.valid?
  end
end
