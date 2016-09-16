defmodule RocketLaunches.Notification do
  alias RocketLaunches.Subscription
  alias RocketLaunches.Repo

  def send_notifications do
     Repo.all Subscription
     |> IO.inspect
  end

end
