# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :joggernaut,
  ecto_repos: [Joggernaut.Repo]

# Configures the endpoint
config :joggernaut, Joggernaut.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2SPYbDvUEaz5ZVlX2IKrAvWOQLdONsdTHPD9/P1BOU1YjoFUB+ceY2SPl91jp3u4",
  render_errors: [view: Joggernaut.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Joggernaut.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :guardian, Guardian,
 issuer: "Joggernaut",
 ttl: { 3, :days },
 verify_issuer: true,
 secret_key: "<place_your_secret_key_here>",
 serializer: Joggernaut.GuardianSerializer

config :canary,
 repo: Joggernaut.Repo,
 unauthorized_handler: {Joggernaut.SessionController, :unauthorized},
 not_found_handler: {Joggernaut.SessionController, :not_found}

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
