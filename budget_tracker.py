#!/usr/bin/env python3
"""Personal Budget Tracker - Console Application"""

import datetime
from collections import defaultdict


def get_valid_amount(prompt):
    while True:
        try:
            amount = float(input(prompt))
            if amount <= 0:
                print("Amount must be positive.")
                continue
            return round(amount, 2)
        except ValueError:
            print("Invalid amount. Please enter a number.")


def get_valid_date(prompt):
    while True:
        date_str = input(prompt)
        try:
            return datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            print("Invalid date format. Use YYYY-MM-DD.")


def add_entry(entries):
    print("\n--- Add Entry ---")
    entry_type = ""
    while entry_type not in ("income", "expense"):
        entry_type = input("Type (income/expense): ").strip().lower()
        if entry_type not in ("income", "expense"):
            print("Please enter 'income' or 'expense'.")

    category = input("Category (e.g., Food, Rent, Salary): ").strip()
    if not category:
        category = "Uncategorized"

    amount = get_valid_amount("Amount: $")
    date = get_valid_date("Date (YYYY-MM-DD): ")

    entry = {
        "type": entry_type,
        "category": category,
        "amount": amount,
        "date": date,
    }
    entries.append(entry)
    print(f"\nAdded {entry_type}: ${amount:.2f} [{category}] on {date}")


def view_entries(entries):
    print("\n--- All Entries ---")
    if not entries:
        print("No entries yet.")
        return

    sorted_entries = sorted(entries, key=lambda e: e["date"], reverse=True)
    print(f"{'Date':<12} {'Type':<8} {'Category':<15} {'Amount':>10}")
    print("-" * 50)
    for entry in sorted_entries:
        sign = "+" if entry["type"] == "income" else "-"
        print(
            f"{str(entry['date']):<12} {entry['type']:<8} "
            f"{entry['category']:<15} {sign}${entry['amount']:>8.2f}"
        )


def view_category_summary(entries):
    print("\n--- Summary by Category ---")
    if not entries:
        print("No entries yet.")
        return

    income_by_cat = defaultdict(float)
    expense_by_cat = defaultdict(float)

    for entry in entries:
        if entry["type"] == "income":
            income_by_cat[entry["category"]] += entry["amount"]
        else:
            expense_by_cat[entry["category"]] += entry["amount"]

    if income_by_cat:
        print("\nIncome:")
        for cat, total in sorted(income_by_cat.items()):
            print(f"  {cat:<20} +${total:>10.2f}")

    if expense_by_cat:
        print("\nExpenses:")
        for cat, total in sorted(expense_by_cat.items()):
            print(f"  {cat:<20} -${total:>10.2f}")

    total_income = sum(income_by_cat.values())
    total_expense = sum(expense_by_cat.values())
    net = total_income - total_expense
    print(f"\n{'='*35}")
    print(f"  Total Income:    +${total_income:>10.2f}")
    print(f"  Total Expenses:  -${total_expense:>10.2f}")
    print(f"  Net:              {'+' if net >= 0 else '-'}${abs(net):>9.2f}")


def view_monthly_totals(entries):
    print("\n--- Monthly Totals ---")
    if not entries:
        print("No entries yet.")
        return

    monthly = defaultdict(lambda: {"income": 0.0, "expense": 0.0})

    for entry in entries:
        month_key = entry["date"].strftime("%Y-%m")
        monthly[month_key][entry["type"]] += entry["amount"]

    print(f"{'Month':<10} {'Income':>12} {'Expenses':>12} {'Net':>12}")
    print("-" * 50)
    for month in sorted(monthly.keys()):
        inc = monthly[month]["income"]
        exp = monthly[month]["expense"]
        net = inc - exp
        sign = "+" if net >= 0 else "-"
        print(
            f"{month:<10} ${inc:>10.2f} ${exp:>10.2f} "
            f"{sign}${abs(net):>9.2f}"
        )


def main():
    entries = []
    print("=" * 40)
    print("   Personal Budget Tracker")
    print("=" * 40)

    while True:
        print("\nMenu:")
        print("  1. Add income/expense entry")
        print("  2. View all entries")
        print("  3. View summary by category")
        print("  4. View monthly totals")
        print("  5. Exit")

        choice = input("\nSelect option (1-5): ").strip()

        if choice == "1":
            add_entry(entries)
        elif choice == "2":
            view_entries(entries)
        elif choice == "3":
            view_category_summary(entries)
        elif choice == "4":
            view_monthly_totals(entries)
        elif choice == "5":
            print("\nGoodbye!")
            break
        else:
            print("Invalid option. Please select 1-5.")


if __name__ == "__main__":
    main()
