defmodule Joggernaut.Repo.Migrations.CreateJog do
  use Ecto.Migration
  #mix phoenix.gen.model Jog jogs jog_date:date time:integer distance:integer user_id:references:users
  def change do
    create table(:jogs) do
      add :jog_date, :date, null: false
      add :time, :integer, null: false
      add :distance, :integer, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end
    create index(:jogs, [:user_id])

  end
end
