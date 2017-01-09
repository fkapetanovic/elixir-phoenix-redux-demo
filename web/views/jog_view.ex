defmodule Joggernaut.JogView do
  use Joggernaut.Web, :view

  def render("index.json", %{jogs: jogs}) do
    %{
      jogs: jogs
    }
  end

  def render("show.json", %{jog: jog}) do
    %{
      jog: jog
    }
  end

  def render("report.json", %{report: report}) do
    %{
      report: report
    }
  end
end
