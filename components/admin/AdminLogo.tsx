'use client'

export const AdminLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
        <span className="text-tone-inverse font-bold text-lg">IIS</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-900 dark:text-tone-inverse">
          IIS Manufacturing
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Admin Panel
        </span>
      </div>
    </div>
  )
}
