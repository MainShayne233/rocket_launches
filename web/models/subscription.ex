defmodule RocketLaunches.Subscription do
  use RocketLaunches.Web, :model
  alias RocketLaunches.Repo
  alias RocketLaunches.Subscription
  alias RocketLaunches.Data


  schema "subscriptions" do
    field :locations, {:array, :string}
    field :rockets, {:array, :string}
    field :phone_number, :string
    field :email_address, :string
    field :time_zone, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:locations, :rockets, :phone_number, :email_address, :time_zone])
    |> validate_required([:phone_number, :time_zone])
  end

  def all do
     Repo.all Subscription
  end

  def is_ten_for subscription do
    subscription.time_zone
    |> Data.today_for
    |> IO.inspect
  end
end
