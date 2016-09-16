defmodule RocketLaunches.RocketTest do
  use RocketLaunches.ModelCase

  alias RocketLaunches.Rocket

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Rocket.changeset(%Rocket{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Rocket.changeset(%Rocket{}, @invalid_attrs)
    refute changeset.valid?
  end
end
