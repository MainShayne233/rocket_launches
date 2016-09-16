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

  def update rockets do
    Repo.delete_all Rocket
    rockets
    |> Enum.map(&(&1["name"]))
    |> Enum.uniq
    |> Enum.each(fn (rocket_name) ->
      %Rocket{}
      |> Rocket.changeset(%{name: rocket_name})
      |> Repo.insert
    end)
    :ok
  end

  def from data do
     
  end
end
