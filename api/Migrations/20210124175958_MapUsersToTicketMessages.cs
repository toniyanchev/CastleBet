using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class MapUsersToTicketMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TicketMessages",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_TicketMessages_UserId",
                table: "TicketMessages",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketMessages_Users_UserId",
                table: "TicketMessages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketMessages_Users_UserId",
                table: "TicketMessages");

            migrationBuilder.DropIndex(
                name: "IX_TicketMessages_UserId",
                table: "TicketMessages");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Tickets");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TicketMessages",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
