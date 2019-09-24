using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomersApplication.Migrations
{
    public partial class Intial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PMId",
                table: "CustomerDetails",
                newName: "CMId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CMId",
                table: "CustomerDetails",
                newName: "PMId");
        }
    }
}
