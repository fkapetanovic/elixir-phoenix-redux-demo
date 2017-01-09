defmodule Joggernaut.PageController do
  use Joggernaut.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
