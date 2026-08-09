import { prisma } from "@/lib/prisma"  
import { AccountNature, EntryType, AccountSource, SystemAccountKey} from "../generated/prisma/enums"


async function main() {
  console.log("🌱 Iniciando seed...")

  // ----------------------
  // ACCOUNT TYPES
  // ----------------------

  const asset = await prisma.accountType.create({
    data: {
      code: "ASSET",
      name: "Activo",
      nature: AccountNature.DEBIT
    }
  })

  const liability = await prisma.accountType.create({
    data: {
      code: "LIABILITY",
      name: "Pasivo",
      nature: AccountNature.CREDIT
    }
  })

  const equity = await prisma.accountType.create({
    data: {
      code: "EQUITY",
      name: "Patrimonio",
      nature: AccountNature.CREDIT
    }
  })

  const income = await prisma.accountType.create({
    data: {
      code: "INCOME",
      name: "Ingreso",
      nature: AccountNature.CREDIT
    }
  })

  const expense = await prisma.accountType.create({
    data: {
      code: "EXPENSE",
      name: "Gasto",
      nature: AccountNature.DEBIT
    }
  })

  // ----------------------
  // USER
  // ----------------------

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
      image: '',
      password: 'test'
    }
  })

  // ----------------------
  // PROJECT
  // ----------------------

  const project = await prisma.project.create({
    data: {
      name: "Personal",
      userId: user.id,
      description: 'Test init project'
    }
  })

  // ----------------------
  // TRANSACTION CATEGORIES
  // ----------------------

  await prisma.transactionCategory.createMany({
  data: [

  {
    name: "Entretenimiento",
    icon: "film",
    color: "#8b5cf6"
  },
      {
    name: "Hogar",
    icon: "house",
    color: "#84cc16"
  },
  {
    name: "Mascotas",
    icon: "paw-print",
    color: "#f59e0b"
  },
  {
    name: "Viajes",
    icon: "plane",
    color: "#06b6d4"
  },
  {
    name: "Tecnología",
    icon: "laptop",
    color: "#0ea5e9"
  },
  {
    name: "Ropa",
    icon: "shirt",
    color: "#ec4899"
  },
  {
    name: "Regalos",
    icon: "gift",
    color: "#f43f5e"
  },
  {
    name: "Impuestos",
    icon: "receipt",
    color: "#78716c"
  },
  {
    name: "Inversiones",
    icon: "chart-line",
    color: "#22c55e"
  },
  {
    name: "Suscripciones",
    icon: "badge-dollar-sign",
    color: "#6366f1"
  },
    {
      name: "Comida",
      icon: "utensils",
      color: "#f97316"
    },
    {
      name: "Transporte",
      icon: "car",
      color: "#3b82f6"
    },
    {
      name: "Servicios",
      icon: "bolt",
      color: "#eab308"
    },
    {
      name: "Salario",
      icon: "wallet",
      color: "#22c55e"
    },
    {
      name: "Ocio",
      icon: "gamepad",
      color: "#a855f7"
    },
    {
      name: "Salud",
      icon: "heart-pulse",
      color: "#ef4444"
    },
    {
      name: "Educación",
      icon: "book",
      color: "#6366f1"
    },
    {
      name: "Transferencia",
      icon: "repeat",
      color: "#14b8a6"
    },
    {
      name: "Ahorro",
      icon: "piggy-bank",
      color: "#10b981"
    },
    {
      name: "Otros",
      icon: "box",
      color: "#6b7280"
    },
    {
      name: "Compras",
      icon: "shopping-cart",
      color: "#f97316"
    },
    {
      name: "Ventas",
      icon: "shopping-bag",
      color: "#22c55e"
    }
  ]
})

  // ----------------------
  // BASE ACCOUNTS
  // ----------------------

  await prisma.account.createMany({
  data: [
    {
      name: "Efectivo",
      code: "1100",
      accountTypeId: asset.id,
      source: AccountSource.SYSTEM,
      projectId: project.id
    },
    {
      name: "Tarjeta de crédito",
      code: "2101",
      accountTypeId: liability.id,
      source: AccountSource.SYSTEM,
      projectId: project.id
    },
    {
      name: "Ahorros",
      code: "1103",
      accountTypeId: asset.id,
      description: 'Fondos reservados para metas o emergencias.',
      source: AccountSource.SYSTEM,
      projectId: project.id
    }
  ]
})

  const cash = await prisma.account.create({
    data: {
      name: "Caja",
      code: "1101",

      description: 'Dinero en efectivo disponible para gastos diarios.',
      accountTypeId: asset.id,
      source: AccountSource.USER,
      systemKey: SystemAccountKey.CASH,
      projectId: project.id
    }
  })

  const bank = await prisma.account.create({
    data: {
      name: "Banco",
      code: "1102",
      description: 'Dinero depositado en cuentas bancarias.',
      accountTypeId: asset.id,
      source: AccountSource.USER,
      systemKey: SystemAccountKey.BANK,
      projectId: project.id
    }
  })

  const salary = await prisma.account.create({
    data: {
      name: "Ingresos por salario",
      code: "4101",

      accountTypeId: income.id,

      source: AccountSource.USER,
      projectId: project.id
    }
  })

  const foodExpense = await prisma.account.create({
    data: {
      name: "Gastos de comida",
      code: "5101",

      accountTypeId: expense.id,
      description: 'Compras relacionadas con comida y bebidas.',

      source: AccountSource.USER,
      projectId: project.id
    }
  })

  // ----------------------
  // CATEGORY LOOKUP
  // ----------------------

  const foodCategory = await prisma.transactionCategory.findFirst({
    where: {
      name: "Comida"
    }
  })

  // ----------------------
  // SAMPLE TRANSACTION
  // ----------------------

  const transaction = await prisma.transaction.create({
    data: {
      title: "Compra de comida",
      description: "Se compro pollo campero para la bandita",

      date: new Date(),

      projectId: project.id,

      categoryId: foodCategory?.id,
    }
  })

  // ----------------------
  // DOUBLE ENTRY
  // ----------------------

  await prisma.entry.createMany({
    data: [
      {
        transactionId: transaction.id,

        accountId: foodExpense.id,

        type: EntryType.DEBIT,

        amount: 10
      },

      {
        transactionId: transaction.id,

        accountId: cash.id,

        type: EntryType.CREDIT,

        amount: 10
      }
    ]
  })

  console.log("✅ Seed completado con éxito")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })