export default function SubPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container max-w-[980px] px-4 pb-8 pt-6 md:px-8 md:py-10">
      {children}
    </div>
  )
}
