defmodule RocketLaunches.Subscription do
  use RocketLaunches.Web, :model
  alias RocketLaunches.Repo
  alias RocketLaunches.Subscription

  schema "subscriptions" do
    field :locations, {:array, :string}
    field :rockets, {:array, :string}
    field :phone_number, :string
    field :email_address, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:locations, :rockets, :phone_number, :email_address])
    |> validate_required([:phone_number])
  end

  def all do
     Repo.all Subscription
  end
end
