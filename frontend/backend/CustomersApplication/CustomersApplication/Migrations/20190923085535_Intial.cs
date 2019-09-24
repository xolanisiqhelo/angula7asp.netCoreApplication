using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomersApplication.Migrations
{
    public partial class Intial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "CustomerDetails",
                newName: "PMId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PMId",
                table: "CustomerDetails",
                newName: "id");
        }
    }
}
