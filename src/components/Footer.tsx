export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-text-secondary text-sm">
          命理探索 © {new Date().getFullYear()} — 仅供娱乐参考，请勿过度依赖
        </p>
        <p className="text-text-secondary/50 text-xs mt-2">
          命运之书由你亲手书写 · 探索未知，敬畏生命
        </p>
      </div>
    </footer>
  )
}
