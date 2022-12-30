import * as React from "react";
import { NextPage } from "next";
import Engine, { formatValue } from "publicodes";

import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";

type InputProps = {
  name: string;
  label: string;
  hint?: string;
  messages?: React.ReactNode;
} & Partial<React.InputHTMLAttributes<HTMLInputElement>>;

const Input = ({ name, label, hint, messages, ...rest }: InputProps) => {
  const inputId = React.useId();
  return (
    <div className="fr-input-group">
      <label className="fr-label" htmlFor={inputId}>
        {label}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <div className="fr-input-wrap">
        {" "}
        <input
          className="fr-input"
          type="text"
          id={inputId}
          name={name}
          {...rest}
        />
      </div>
      {messages}
    </div>
  );
};

//@ts-ignore
import rules from "../src/publicodes.yaml";

const Home: NextPage = () => {
  const engine = new Engine(rules);
  const [situation, setSituation] = React.useState({});

  const montant = engine.setSituation(situation).evaluate("montant");

  const setValue =
    (key: string): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const value = parseInt(e.currentTarget.value);
      if (value) {
        setSituation({
          ...situation,
          [key]: value,
        });
      } else {
        setSituation({ ...situation, [key]: 0 });
      }
    };
  const formattedMontant = formatValue(montant);
  return (
    <>
      <Alert
        title="Simulation d'indemnité de rupture conventionnelle"
        description="Ce simulateur s'adresse exclusivement aux destinataires du courrier d'information sur la rupture conventionnelle"
        severity="warning"
      />
      <br />
      <br />
      <div className="fr-grid-row">
        <div className="fr-col">
          <h2>Simulation d&apos;indemnité de rupture conventionnelle</h2>
          <p>
            Obtenez rapidement une première estimation de votre indemnité de
            rupture conventionnelle.
            <br />
            <br />
            <div className="fr-messages-group" aria-live="assertive">
              <p className="fr-message">Conditions d&apos;éligibilité :</p>
              <p className="fr-message fr-message--info">
                Être agent public de FPE, FPT, FPH
              </p>
              <p className="fr-message fr-message--info">
                Exercer dans les départements XXX
              </p>
              <p className="fr-message fr-message--info">
                1 année minimum d&apos;ancienneté
              </p>
            </div>
          </p>
        </div>
      </div>
      <div className="fr-grid-row">
        <div className="fr-col">
          <Input
            name="anciennete"
            label="Ancienneté en années"
            hint="Ancienneté totale de l’agent dans la Fonction Publique = durée cumulée des services accomplis dans la FPE, FPT, FPH exprimée en années complètes."
            type="number"
            onChange={setValue("anciennete")}
          />
          <Input
            name="remuneration"
            label="Rémunération brute annuelle totale"
            hint="Rémunération brute annuelle totale de la dernière année civile (apparaissant sur le bulletin de salaire de décembre)."
            onChange={setValue("remuneration")}
            type="number"
          />
        </div>
      </div>
      {montant.nodeValue && (
        <div className="fr-grid-row">
          <div className="fr-col">
            <div style={{ fontSize: "22px", marginTop: "1em" }}>
              Votre indemnité de rupture conventionnelle pourrait aller
              jusqu&apos;à&nbsp;
              <b>{formattedMontant} </b>
            </div>
            <br />
            <br />
            <Button
              title="Déposer ma demande via démarches-simplifiées.fr"
              iconId="fr-icon-send-plane-fill"
              linkProps={{
                href: "https://www.demarches-simplifiees.fr/commencer/test/d2f7c653-9d17-495c-b11c-d00b736952fb",
                target: "_blank",
              }}
              size="large"
            >
              Déposer ma demande via démarches-simplifiées.fr
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
