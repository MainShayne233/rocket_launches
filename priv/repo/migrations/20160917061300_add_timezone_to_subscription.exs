defmodule RocketLaunches.Repo.Migrations.AddTimezoneToSubscription do
  use Ecto.Migration

  def change do
    alter table(:subscriptions) do
      add :time_zone, :string
    end
  end
end
