defmodule RocketLaunches.Notification do
  alias RocketLaunches.Subscription
  alias RocketLaunches.Repo

  def send do
     Subscription.all
     |> IO.inspect
  end

end
