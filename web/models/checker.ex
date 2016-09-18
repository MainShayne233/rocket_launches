defmodule RocketLaunches.Checker do
  use GenServer
  alias RocketLaunches.Notification

  def start_link do
    GenServer.start_link __MODULE__, %{}
  end

  def init state do
    schedule_work
    {:ok, state}
  end

  def handle_info :work, state do
    IO.inspect  ExTwilio.Message.create(to: "3212929136", from: "18442422517",  body: "poop")
    schedule_work
    {:noreply, state}
  end

  defp schedule_work do
    Process.send_after self, :work, 1000 * 10
  end

end
