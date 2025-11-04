export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        padding: '24px',
        width: '100%',
        maxWidth: '360px',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  )
}
