import { Router, Request, Response }  from 'express';
import MySQL from '../db/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    const qry = 'select * from heroes';
    MySQL.executeQuery(qry, (err: any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                heroes
            });
        }
    });
});

router.get('/heroe/:id', (req: Request, res: Response) => {
    const escapedId = MySQL.instance.cnn.escape(req.params.id);
    const qry = `select * from heroes where id = ${escapedId}`;
    MySQL.executeQuery(qry, (err: any, heroe: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});

export default router;