defmodule RocketLaunches.Repo.Migrations.CreateRocket do
  use Ecto.Migration

  def change do
    create table(:rockets) do
      add :name, :string

      timestamps()
    end

  end
end
