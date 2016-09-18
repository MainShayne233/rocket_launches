defmodule RocketLaunches.Checker do
  use GenServer

  def start_link do
    GenServer.start_link __MODULE__, %{}
  end

  def init state do
    schedule_work
    {:ok, state}
  end

  def handle_info :work, state do
    System.cmd "say", ["hi"]
    schedule_work
    {:noreply, state}
  end

  defp schedule_work do
    Process.send_after self, :work, 1000 * 5
  end

end
