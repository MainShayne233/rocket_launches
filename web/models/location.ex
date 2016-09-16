defmodule RocketLaunches.Location do
  use RocketLaunches.Web, :model
  alias RocketLaunches.Location
  alias RocketLaunches.Repo

  schema "locations" do
    field :name, :string
    field :country, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :country])
    |> validate_required([:name, :country])
  end

  def update locations do
    Repo.delete_all Location
    locations
    |> Enum.map(&(%{name: &1["name"], country: &1["countryCode"]}))
    |> Enum.uniq
    |> Enum.each(fn (location) ->
      %Location{}
      |> Location.changeset(%{name: location.name, country: location.country})
      |> Repo.insert
    end)
    :ok
  end

end
