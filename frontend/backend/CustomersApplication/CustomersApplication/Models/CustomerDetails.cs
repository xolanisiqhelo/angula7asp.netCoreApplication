using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CustomersApplication.Models
{
    public class CustomerDetails
    {
        [Key]
        public int CMId { get; set; }

        [Required]
        [Column(TypeName="nvarchar(100)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName="nvarchar(100)")]
        public string LastName { get; set; }

        [Required]
        [Column(TypeName="varchar(10)")]
        public string CellPhone { get; set; }

        [Required]
        [Column(TypeName="nvarchar(100)")]
        public string EmailAddress { get; set; }

        [Required]
        [Column(TypeName="nvarchar(100)")]
        public string ResidentialAddress { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string City { get; set; }

        [Required]
        [Column(TypeName="varchar(4)")]
        public string PostalCode { get; set; }
    }
    }
