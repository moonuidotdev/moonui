/**
 * GUARD FIXTURE ortak bolumu — fixture.html tarafindan yuklenir.
 *
 * Yedi component senaryosu. Secim keyfi degil: bunlar #408/#456'da CIFT REACT
 * yuzunden coken component'lerin ta kendisi (Switch → useId, Tooltip → useContext,
 * Accordion → useRef, Dialog/Select → portal + useId, Tabs → context).
 * Card+Button hooksuz referans noktasidir: o calisip otekiler cokerse sorun
 * "bundle yuklenmedi" degil "React tekil degil" demektir.
 */
export function run({ React, createRoot, MoonUI }) {
    const h = React.createElement;

    window.__reactVersionLoaded = React.version;
    window.__moonuiExportCount = Object.keys(MoonUI).length;

    const results = {};
    window.__moonuiResults = results;

    class ErrorBoundary extends React.Component {
        constructor(p) { super(p); this.state = { error: null }; }
        static getDerivedStateFromError(error) { return { error }; }
        componentDidCatch(error) {
            results[this.props.label] = { ok: false, error: String((error && error.message) || error) };
        }
        render() {
            if (this.state.error) {
                return h("div", { "data-failed": this.props.label },
                    this.props.label + " COKTU: " + String(this.state.error.message || this.state.error));
            }
            return h("section", { "data-case": this.props.label, className: "mb-6 p-4 border border-border rounded-lg" },
                h("h2", { className: "text-sm font-semibold mb-3 text-muted-foreground" }, this.props.label),
                this.props.children);
        }
    }

    const Case = (label, children) => h(ErrorBoundary, { label, key: label }, children);

    function App() {
        const hookless = Case("Card+Button", [
            h(MoonUI.Card, { key: "c" }, [
                h(MoonUI.CardHeader, { key: "h" }, h(MoonUI.CardTitle, null, "Card title")),
                h(MoonUI.CardContent, { key: "b" },
                    h(MoonUI.Button, { "data-testid": "btn", variant: "primary" }, "Primary Button")),
            ]),
        ]);

        const sw = Case("Switch", h(MoonUI.Switch, { "data-testid": "switch", defaultChecked: false }));

        const tip = Case("Tooltip",
            h(MoonUI.TooltipProvider, { delayDuration: 0 },
                h(MoonUI.Tooltip, null, [
                    h(MoonUI.TooltipTrigger, { key: "t", asChild: true },
                        h(MoonUI.Button, { "data-testid": "tooltip-trigger", variant: "outline" }, "Hover me")),
                    h(MoonUI.TooltipContent, { key: "c", "data-testid": "tooltip-content" }, "Tooltip content"),
                ])));

        const acc = Case("Accordion",
            h(MoonUI.Accordion, { type: "single", collapsible: true, "data-testid": "accordion" },
                h(MoonUI.AccordionItem, { value: "item-1" }, [
                    h(MoonUI.AccordionTrigger, { key: "t", "data-testid": "accordion-trigger" }, "Section 1"),
                    h(MoonUI.AccordionContent, { key: "c" },
                        h("span", { "data-testid": "accordion-content" }, "Accordion content opened")),
                ])));

        const dlg = Case("Dialog",
            h(MoonUI.Dialog, null, [
                h(MoonUI.DialogTrigger, { key: "t", asChild: true },
                    h(MoonUI.Button, { "data-testid": "dialog-trigger" }, "Open dialog")),
                h(MoonUI.DialogContent, { key: "c" }, [
                    h(MoonUI.DialogHeader, { key: "h" }, [
                        h(MoonUI.DialogTitle, { key: "t", "data-testid": "dialog-title" }, "Dialog title"),
                        h(MoonUI.DialogDescription, { key: "d" }, "Rendered through a portal."),
                    ]),
                ]),
            ]));

        const sel = Case("Select",
            h(MoonUI.Select, null, [
                h(MoonUI.SelectTrigger, { key: "t", "data-testid": "select-trigger", className: "w-[220px]" },
                    h(MoonUI.SelectValue, { placeholder: "Pick an option" })),
                h(MoonUI.SelectContent, { key: "c" }, [
                    h(MoonUI.SelectItem, { key: "1", value: "a", "data-testid": "select-item-a" }, "Option A"),
                    h(MoonUI.SelectItem, { key: "2", value: "b" }, "Option B"),
                ]),
            ]));

        const tabs = Case("Tabs",
            h(MoonUI.Tabs, { defaultValue: "one" }, [
                h(MoonUI.TabsList, { key: "l" }, [
                    h(MoonUI.TabsTrigger, { key: "a", value: "one" }, "One"),
                    h(MoonUI.TabsTrigger, { key: "b", value: "two", "data-testid": "tab-two" }, "Two"),
                ]),
                h(MoonUI.TabsContent, { key: "c1", value: "one" }, "First tab"),
                h(MoonUI.TabsContent, { key: "c2", value: "two" },
                    h("span", { "data-testid": "tab-two-content" }, "Second tab content")),
            ]));

        return h("div", null, [hookless, sw, tip, acc, dlg, sel, tabs]);
    }

    try {
        createRoot(document.getElementById("root")).render(h(App));
        window.__moonuiMounted = true;
    } catch (e) {
        window.__moonuiMountError = String((e && e.message) || e);
        window.__moonuiMounted = false;
    } finally {
        window.__moonuiDone = true;
    }
}
