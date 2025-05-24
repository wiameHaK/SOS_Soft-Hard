import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    // Configurer le transporteur Nodemailer (ici avec Gmail comme exemple)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Votre email Gmail
        pass: process.env.EMAIL_PASS, // Votre mot de passe ou mot de passe d'application
      },
    });

    // Définir les options de l'email
    let mailOptions = {
      from: email, // Email de l'expéditeur (utilisateur qui remplit le formulaire)
      to: 'contact@soshardandsoft.com', // Remplacez par l'email destinataire
      subject: subject,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email envoyé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}