defmodule RocketLaunches.Checker do
  use GenServer
  alias RocketLaunches.Notification
  alias RocketLaunches.Data

  def start_link do
    GenServer.start_link __MODULE__, %{}
  end

  def init state do
    schedule_work
    {:ok, state}
  end

  def handle_info :work, state do
    Notification.send
    Data.update
    schedule_work
    {:noreply, state}
  end

  defp schedule_work do
    Process.send_after self, :work, 1000 * 60 * 60
  end

end
