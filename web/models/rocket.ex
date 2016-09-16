defmodule RocketLaunches.Rocket do
  use RocketLaunches.Web, :model
  alias RocketLaunches.Rocket
  alias RocketLaunches.Repo

  schema "rockets" do
    field :name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end

  def update launches do
    Repo.delete_all Rocket
    launches
    |> Enum.map(&(Rocket.for(&1)))
    |> Enum.uniq
    |> Enum.each(fn (rocket_name) ->
      %Rocket{}
      |> Rocket.changeset(%{name: rocket_name})
      |> Repo.insert
    end)
    :ok
  end

  def for launch do
    launch["rocket"]["name"]
  end
end
