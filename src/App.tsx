import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import {
  Eye,
  ChevronDown,
  Search,
  LayoutDashboard,
  Zap,
  BookOpen,
  FileText,
  Link,
  Plug,
  Database,
  ArrowLeftRight,
  Globe,
  Calculator,
  Settings2,
  Box,
  BarChart2,
  Layers,
  Upload,
  Users,
  HardDrive,
  X,
  Check,
  Sparkles,
  Bell,
  Bookmark,
  Settings,
  Layout,
  ChevronRight,
  AlertCircle,
  Mail,
  Building2,
  Lock,
} from 'lucide-react'

// ──────────────────────────────────────────────
// Utility
// ──────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

// ──────────────────────────────────────────────
// T&C Content data
// ──────────────────────────────────────────────
const TC_POINTS = [
  {
    title: 'Aceptación de los términos.',
    body: 'Al acceder o utilizar cualquier herramienta o servicio impulsado por IA proporcionado a través de esta plataforma, usted reconoce que ha leído, entendido y acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con estos términos, debe dejar de utilizar inmediatamente todos los servicios de IA.',
  },
  {
    title: 'Descargo de responsabilidad sobre contenido generado por IA.',
    body: 'El contenido generado por herramientas de IA se proporciona "tal cual", sin garantías de ningún tipo, ya sean expresas o implícitas. Los resultados de la IA pueden contener inexactitudes, errores o sesgos. Usted es el único responsable de revisar, validar y verificar todo el contenido generado por IA antes de su uso. La plataforma no garantiza la exactitud, integridad ni fiabilidad de ningún resultado generado por IA.',
  },
  {
    title: 'Procesamiento de datos y privacidad.',
    body: 'Al utilizar los servicios de IA, usted consiente el procesamiento de los datos de entrada por parte de nuestros modelos de IA. Los datos de entrada pueden utilizarse para generar respuestas y mejorar la calidad del servicio. Implementamos medidas de seguridad estándar de la industria para proteger sus datos; sin embargo, no debe enviar información personal sensible, secretos comerciales ni datos empresariales confidenciales a través de herramientas de IA sin las salvaguardas adecuadas.',
  },
  {
    title: 'Limitaciones de uso.',
    body: 'Usted se compromete a no utilizar las herramientas de IA para generar contenido dañino, engañoso, difamatorio o que infrinja las leyes aplicables. Están estrictamente prohibidas las solicitudes automatizadas masivas, la ingeniería inversa de los modelos de IA y los intentos de extraer datos de entrenamiento. Nos reservamos el derecho de imponer límites de uso y cuotas a nuestra discreción.',
  },
  {
    title: 'Limitación de responsabilidad.',
    body: 'En la máxima medida permitida por la ley, la plataforma y sus afiliados no serán responsables por ningún daño indirecto, incidental, especial, consecuente o punitivo derivado del uso de los servicios de IA, incluyendo, entre otros, la pérdida de beneficios, datos u oportunidades de negocio.',
  },
]

// ──────────────────────────────────────────────
// Shared: T&C scrollable block
// ──────────────────────────────────────────────
function TCBlock({ height = 'h-56' }: { height?: string }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <Sparkles className="w-4 h-4 text-violet-600 flex-shrink-0" />
        <p className="text-xs font-semibold text-gray-900 leading-snug">
          Términos y condiciones para el uso de herramientas de Inteligencia Artificial en Simetrik
        </p>
      </div>
      <ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', height)}>
        <ScrollAreaPrimitive.Viewport className="h-full w-full">
          <ol className="px-4 py-3 space-y-3">
            {TC_POINTS.map((p, i) => (
              <li key={i} className="text-xs text-gray-700 leading-relaxed">
                <span className="font-semibold">{i + 1}. {p.title}</span>{' '}
                {p.body}
              </li>
            ))}
          </ol>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className="flex touch-none select-none transition-colors w-2.5 border-l border-l-transparent p-[1px]"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-gray-300" />
        </ScrollAreaPrimitive.Scrollbar>
      </ScrollAreaPrimitive.Root>
    </div>
  )
}

// ──────────────────────────────────────────────
// Shared: Checkbox row
// ──────────────────────────────────────────────
interface CheckRowProps {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
  children: React.ReactNode
}

function CheckRow({ checked, onChange, disabled, children }: CheckRowProps) {
  return (
    <label className={cn('flex items-start gap-3', disabled ? 'cursor-default' : 'cursor-pointer')}>
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(v) => !disabled && onChange(v === true)}
        disabled={disabled}
        className="h-4 w-4 shrink-0 rounded-sm border border-violet-600 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check className="h-3 w-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span className="text-sm text-gray-700 leading-snug">{children}</span>
    </label>
  )
}

// ──────────────────────────────────────────────
// Sidebar
// ──────────────────────────────────────────────
type Screen = 'home' | 'settings' | 'nudge'

function Sidebar({
  activeScreen,
  onNavigate,
}: {
  activeScreen: Screen
  onNavigate: (s: Screen) => void
}) {
  const [expanded, setExpanded] = useState(true)

  const sub = (icon: React.ReactNode, text: string) => (
    <div
      key={text}
      className="flex items-center gap-2 pl-7 pr-3 py-[5px] text-xs rounded-md mx-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 cursor-default"
    >
      <span className="w-3.5 h-3.5 flex-shrink-0">{icon}</span>
      {text}
    </div>
  )

  const section = (label: string, children: React.ReactNode) => (
    <div className="mb-0.5">
      <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      {children}
    </div>
  )

  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-violet-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="font-semibold text-sm text-gray-900">Simetrik</span>
        </div>
        <Eye className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>

      {/* Workspace */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
        <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">E</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-900 truncate">Espacio de trabajo</p>
          <p className="text-[10px] text-gray-500 truncate">Nombre de la cuenta</p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-gray-200 text-gray-400">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs flex-1">Buscar</span>
          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">Ctrl+K</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div
          onClick={() => onNavigate('home')}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 text-xs rounded-md mx-1 cursor-pointer mb-0.5',
            activeScreen === 'home'
              ? 'bg-violet-50 text-violet-700 font-semibold'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          Resumen
        </div>

        {/* Automatizar */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 rounded-md"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gray-500" />
            Automatizar
          </div>
          <ChevronDown className={cn('w-3.5 h-3.5 text-gray-400 transition-transform', expanded && 'rotate-180')} />
        </button>

        {expanded && (
          <div className="mt-0.5">
            {section('Soluciones', <>
              {sub(<BookOpen className="w-3.5 h-3.5" />, 'Catálogo')}
              {sub(<FileText className="w-3.5 h-3.5" />, 'Plantillas')}
            </>)}
            {section('Integraciones', <>
              {sub(<Database className="w-3.5 h-3.5" />, 'Repositorios')}
              {sub(<Plug className="w-3.5 h-3.5" />, 'Conexiones')}
            </>)}
            {section('Recursos y conciliaciones', <>
              {sub(<Box className="w-3.5 h-3.5" />, 'Recursos')}
              {sub(<ArrowLeftRight className="w-3.5 h-3.5" />, 'Conciliaciones')}
              {sub(<Globe className="w-3.5 h-3.5" />, 'Fuentes de terceros')}
            </>)}
            {section('Contabilidad', <>
              {sub(<Calculator className="w-3.5 h-3.5" />, 'Modelos contables')}
              {sub(<Settings2 className="w-3.5 h-3.5" />, 'Configuraciones de cuentas')}
              {sub(<Link className="w-3.5 h-3.5" />, 'Integraciones ERP')}
            </>)}
            {section('Análisis', <>
              {sub(<Layers className="w-3.5 h-3.5" />, 'Unión de fuentes')}
              {sub(<BarChart2 className="w-3.5 h-3.5" />, 'Consolidaciones')}
              {sub(<BarChart2 className="w-3.5 h-3.5" />, 'Advanced (TBD)')}
            </>)}
            {section('Envío de datos', <>
              {sub(<Upload className="w-3.5 h-3.5" />, 'Exportaciones')}
              {sub(<FileText className="w-3.5 h-3.5" />, 'Reporte de clientes')}
              {sub(<Users className="w-3.5 h-3.5" />, 'Directorio de clientes')}
            </>)}
          </div>
        )}
      </nav>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between">
        {[
          <div key="avatar" className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">E</span>
          </div>,
          <Bell key="bell" className="w-4 h-4" />,
          <Bookmark key="bk" className="w-4 h-4" />,
          <Settings
            key="settings"
            className={cn('w-4 h-4 cursor-pointer', activeScreen === 'settings' && 'text-violet-600')}
            onClick={() => onNavigate('settings')}
          />,
          <Layout key="layout" className="w-4 h-4" />,
        ].map((icon, i) => (
          <button key={i} className="text-gray-400 hover:text-gray-700 p-1 rounded">
            {icon}
          </button>
        ))}
      </div>
    </aside>
  )
}

// ──────────────────────────────────────────────
// Persistent AI Banner
// ──────────────────────────────────────────────
function AIBanner({
  onEnable,
  onClose,
}: {
  onEnable: () => void
  onClose: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 bg-violet-50 border border-violet-200 rounded-lg px-4 py-3 mx-6 mt-4 flex-shrink-0">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <Sparkles className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-violet-700 leading-snug">
            Habilitar herramientas de IA
          </p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Permite que todos los usuarios de tu cuenta accedan a las funcionalidades de IA.
            Gestiona el acceso de tu equipo desde un solo lugar. Estos ajustes se aplican a nivel de espacio de trabajo.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
        <button
          onClick={onEnable}
          className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
        >
          Habilitar IA
        </button>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Screen 3 — Home
// ──────────────────────────────────────────────
function HomeScreen({
  aiEnabled,
  showBanner,
  onBannerClose,
  onEnableAI,
}: {
  aiEnabled: boolean
  showBanner: boolean
  onBannerClose: () => void
  onEnableAI: () => void
}) {
  const [toast, setToast] = useState(true)

  const metrics = [
    { n: 60, label: 'Fuentes', icon: <Database className="w-5 h-5" /> },
    { n: 24, label: 'Conciliaciones', icon: <ArrowLeftRight className="w-5 h-5" /> },
    { n: 25, label: 'Usuarios', icon: <Users className="w-5 h-5" /> },
    { n: 32, label: 'Gigabytes', icon: <HardDrive className="w-5 h-5" /> },
  ]

  const rows = Array.from({ length: 6 })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {showBanner && !aiEnabled && (
        <AIBanner onEnable={onEnableAI} onClose={onBannerClose} />
      )}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Resumen</h1>
        <p className="text-sm text-gray-500 mb-6">
          Encuentra la información actualizada de las fuentes, conciliaciones, usuarios y almacenamiento.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className="bg-violet-600 text-white rounded-xl px-4 py-4 flex items-center gap-3">
              <span className="text-2xl font-bold">{m.n}</span>
              {m.icon}
              <span className="text-sm font-medium">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className="w-4 h-4 text-gray-400" />
          <h2 className="text-base font-semibold text-gray-900">Reciente</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Fuentes', prefix: 'Fuente' },
            { title: 'Conciliaciones', prefix: 'Conciliación' },
          ].map(({ title, prefix }) => (
            <div key={title} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">{title}</span>
                <button className="text-xs text-violet-600 font-medium hover:underline">Ver todo</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Nombre</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-400">Actualizado</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((_, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-xs text-gray-700">
                        {prefix} 2022 - 12 - 01 // Nu
                      </td>
                      <td className="px-4 py-2.5 text-xs text-gray-400 text-right">Hoy</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl">
          <p className="text-sm">
            <strong>¡Tenemos novedades!</strong> Explora las nuevas funcionalidades y mejoras que harán tu trabajo más fácil.
          </p>
          <button className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
            Ver video
          </button>
          <button onClick={() => setToast(false)} className="text-gray-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Screen 2 — AI Agreement Modal
// ──────────────────────────────────────────────
function AIModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(false)
  const canSave = c1 && c2

  const reset = () => { setC1(false); setC2(false) }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) { reset(); onClose() } }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[680px] max-w-[95vw] max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-200 flex-shrink-0">
            <div>
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Acuerdo de Herramientas Impulsadas por IA
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mt-0.5">
                Revisa y acepta los términos para habilitar las funcionalidades impulsadas por inteligencia artificial para tu organización.
              </Dialog.Description>
            </div>
            <button
              onClick={() => { reset(); onClose() }}
              className="text-gray-400 hover:text-gray-600 p-1 rounded ml-4 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 min-h-0">
            <TCBlock height="h-52" />

            <div className="space-y-3">
              <CheckRow checked={c1} onChange={setC1}>
                He leído y acepto los <strong>Términos y Condiciones de los Servicios de IA.</strong>
              </CheckRow>
              <CheckRow checked={c2} onChange={setC2}>
                Entiendo que debo revisar los resultados de IA antes de utilizarlos.
              </CheckRow>
            </div>

            {/* Account info */}
            <div className="relative border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-start gap-2.5 pr-6">
                <Sparkles className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-violet-700 leading-snug">
                    Este acuerdo se aplicará a tu cuenta y afectará todos los usuarios de tu cuenta
                  </p>
                  <p className="text-xs text-gray-500 mt-1.5">Cuenta: admin@company.com</p>
                  <p className="text-xs text-gray-500">Organización: Acme Corporation (Plan Enterprise)</p>
                </div>
              </div>
              <button className="absolute top-3 right-3 text-gray-300 hover:text-gray-500">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={() => { reset(); onClose() }}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => { if (!canSave) return; reset(); onConfirm() }}
              disabled={!canSave}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                canSave
                  ? 'bg-violet-600 text-white hover:bg-violet-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
            >
              Guardar cambios
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ──────────────────────────────────────────────
// Screen 1 — Settings
// ──────────────────────────────────────────────
function SettingsScreen({
  aiEnabled,
  onToggleAI,
}: {
  aiEnabled: boolean
  onToggleAI: (v: boolean) => void
}) {
  const [c1, setC1] = useState(aiEnabled)
  const [c2, setC2] = useState(aiEnabled)
  const bothChecked = c1 && c2

  const menuItems = [
    { icon: <Users className="w-4 h-4" />, label: 'Usuarios del espacio' },
    { icon: <Settings2 className="w-4 h-4" />, label: 'Configuraciones' },
    { icon: <FileText className="w-4 h-4" />, label: 'Formatos' },
    { icon: <Box className="w-4 h-4" />, label: 'Nombre del espacio' },
    { icon: <Sparkles className="w-4 h-4" />, label: 'Habilitar herramientas AI', active: true },
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 px-6 py-3 border-b border-gray-200 text-xs text-gray-400 flex-shrink-0">
        <span>Administrador</span>
        <ChevronRight className="w-3 h-3" />
        <span>Cuenta</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">Espacio de trabajo</span>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Settings sub-nav */}
        <div className="w-52 flex-shrink-0 border-r border-gray-200 py-3 px-2 overflow-y-auto">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 text-xs rounded-md cursor-pointer mb-0.5',
                (item as { active?: boolean }).active
                  ? 'bg-violet-50 text-violet-700 font-semibold border-l-2 border-violet-600'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-xl font-semibold text-gray-900">
              Habilitar herramientas de IA para usuarios
            </h1>
            {aiEnabled ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Herramientas de IA activas
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                No habilitadas
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Gestiona las herramientas de IA para todos los usuarios de tu cuenta.
          </p>

          <div className="mb-5">
            <TCBlock height="h-64" />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 mb-6">
            <CheckRow checked={c1} onChange={setC1} disabled={aiEnabled}>
              He leído y acepto los <strong>Términos y Condiciones de los Servicios de IA.</strong>
            </CheckRow>
            <CheckRow checked={c2} onChange={setC2} disabled={aiEnabled}>
              Entiendo que debo revisar los resultados de IA antes de utilizarlos.
            </CheckRow>
          </div>

          {/* Toggle card */}
          <div className="border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between bg-white">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Habilitar herramientas de IA para usuarios
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Permite que todos los usuarios de tu cuenta accedan a las herramientas de IA.
              </p>
            </div>
            <SwitchPrimitive.Root
              checked={aiEnabled}
              onCheckedChange={(v) => bothChecked && onToggleAI(v)}
              disabled={!bothChecked}
              className={cn(
                'inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40',
                aiEnabled ? 'bg-violet-600 cursor-pointer' : bothChecked ? 'bg-gray-200 cursor-pointer' : 'bg-gray-200'
              )}
            >
              <SwitchPrimitive.Thumb
                className={cn(
                  'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform',
                  aiEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </SwitchPrimitive.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Screen 4 — Nudge (regular user)
// ──────────────────────────────────────────────
function NudgeScreen() {
  const [requested, setRequested] = useState(false)

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
        <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mb-5">
          <Lock className="w-7 h-7 text-violet-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Herramientas de IA no habilitadas
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Las herramientas de IA están disponibles para tu cuenta. Para comenzar a usarlas,
          el administrador de tu organización debe aceptar los términos y condiciones y habilitar el acceso.
        </p>

        {!requested ? (
          <button
            onClick={() => setRequested(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Solicitar habilitación
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-5 py-2.5 rounded-md border border-emerald-200">
            <Check className="w-4 h-4" />
            Solicitud enviada — se notificó al administrador
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-left w-full">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            Si eres administrador, ve a{' '}
            <strong>Configuraciones → Espacio de trabajo → Habilitar herramientas AI</strong>{' '}
            para gestionar el acceso.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
          <Building2 className="w-3.5 h-3.5" />
          <span>Acme Corporation · Plan Enterprise</span>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Demo Navigation Bar
// ──────────────────────────────────────────────
function DemoBar({
  active,
  onNavigate,
  isAdmin,
  onToggleRole,
}: {
  active: Screen
  onNavigate: (s: Screen) => void
  isAdmin: boolean
  onToggleRole: () => void
}) {
  return (
    <div className="fixed top-3 right-4 z-[60] flex items-center gap-2 bg-white/95 backdrop-blur border border-gray-200 rounded-xl px-3 py-1.5 shadow-lg text-xs">
      <span className="text-gray-400 font-medium mr-1">Demo:</span>
      {(['home', 'settings', 'nudge'] as Screen[]).map((s) => (
        <button
          key={s}
          onClick={() => onNavigate(s)}
          className={cn(
            'px-2.5 py-1 rounded-md font-semibold transition-colors',
            active === s ? 'bg-violet-600 text-white' : 'text-gray-500 hover:bg-gray-100'
          )}
        >
          {s === 'home' ? 'Home' : s === 'settings' ? 'Settings' : 'Nudge'}
        </button>
      ))}
      <div className="w-px h-4 bg-gray-200 mx-0.5" />
      <button
        onClick={onToggleRole}
        className={cn(
          'px-2.5 py-1 rounded-md font-semibold transition-colors',
          isAdmin ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        )}
        title="Cambiar rol"
      >
        {isAdmin ? '👤 Admin' : '👥 User'}
      </button>
    </div>
  )
}

// ──────────────────────────────────────────────
// Root App
// ──────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [aiEnabled, setAIEnabled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const [isAdmin, setIsAdmin] = useState(true)

  const handleNavigate = (s: Screen) => setScreen(s)

  const handleModalConfirm = () => {
    setAIEnabled(true)
    setModalOpen(false)
    setBannerVisible(false)
  }

  const toggleRole = () => {
    const next = !isAdmin
    setIsAdmin(next)
    setScreen(next ? 'home' : 'nudge')
  }

  const showSidebar = screen !== 'nudge'

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <DemoBar
        active={screen}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onToggleRole={toggleRole}
      />

      {showSidebar && (
        <Sidebar activeScreen={screen} onNavigate={setScreen} />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {screen === 'home' && (
          <HomeScreen
            aiEnabled={aiEnabled}
            showBanner={bannerVisible}
            onBannerClose={() => setBannerVisible(false)}
            onEnableAI={() => setModalOpen(true)}
          />
        )}
        {screen === 'settings' && (
          <SettingsScreen aiEnabled={aiEnabled} onToggleAI={setAIEnabled} />
        )}
        {screen === 'nudge' && <NudgeScreen />}
      </main>

      <AIModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  )
}
