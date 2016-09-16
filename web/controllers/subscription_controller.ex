defmodule RocketLaunches.SubscriptionController do
  use RocketLaunches.Web, :controller
  alias RocketLaunches.Subscription


  def create conn, %{"subscription" => subscription_params} do
    subscription = %Subscription{}
    changeset = Subscription.changeset(subscription, subscription_params)
    response = case Repo.insert(changeset) do
      { :ok, _ } ->
        "success"
      anything ->
        "failure"
    end
    json conn, response
  end

end
