﻿using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Data
{
    public class GastosJo_ApiContext : DbContext
    {
        public GastosJo_ApiContext(DbContextOptions<GastosJo_ApiContext> options)
            : base(options)
        {
        }

        public DbSet<Models.Banco> Bancos { get; set; } = default!;
    }
}