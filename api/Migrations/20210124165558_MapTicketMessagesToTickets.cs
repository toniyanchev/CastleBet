using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApi.Migrations
{
    public partial class MapTicketMessagesToTickets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_AdminId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_AdminId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "AdminResponse",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "UserRequest",
                table: "Tickets");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastActionDate",
                table: "Tickets",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "TicketMessages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    TicketId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketMessages_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TicketMessages_TicketId",
                table: "TicketMessages",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TicketMessages");

            migrationBuilder.DropColumn(
                name: "LastActionDate",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdminResponse",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "Tickets",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserRequest",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AdminId",
                table: "Tickets",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_AdminId",
                table: "Tickets",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
