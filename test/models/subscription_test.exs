defmodule RocketLaunches.SubscriptionTest do
  use RocketLaunches.ModelCase

  alias RocketLaunches.Subscription

  @valid_attrs %{email_addresses: [], locations: [], phone_numbers: [], rockets: []}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Subscription.changeset(%Subscription{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Subscription.changeset(%Subscription{}, @invalid_attrs)
    refute changeset.valid?
  end
end
