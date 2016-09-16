defmodule RocketLaunches.Repo.Migrations.CreateLocation do
  use Ecto.Migration

  def change do
    create table(:locations) do
      add :name, :string
      add :country, :string

      timestamps()
    end

  end
end
