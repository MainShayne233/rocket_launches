defmodule RocketLaunches.Subscription do
  import Ecto.Query
  use RocketLaunches.Web, :model
  alias RocketLaunches.Repo
  alias RocketLaunches.Subscription
  alias RocketLaunches.Data
  alias RocketLaunches.Time


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

  def all_where_is_ten do
    zones = Time.zones_where_is_ten
    query = from sub in Subscription,
            where: sub.time_zone in ^zones,
            select: sub
    Repo.all query
  end

  def interested_in launch do
    all_where_is_ten
    |> Enum.filter(fn sub ->
      IO.inspect sub
         (Enum.empty?(sub.rockets) or Enum.member?(sub.rockets, launch.rocket)) and
         (Enum.empty?(sub.locations) or Enum.member?(sub.locations, launch.location.name))
       end)
  end
end
