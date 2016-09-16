defmodule RocketLaunches.Repo.Migrations.CreateSubscription do
  use Ecto.Migration

  def change do
    create table(:subscriptions) do
      add :locations, {:array, :string}
      add :rockets, {:array, :string}
      add :phone_number, :string
      add :email_address, :string

      timestamps()
    end

  end
end
